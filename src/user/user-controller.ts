import { Request, Response } from 'express';
import UserService from './user-service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UserWithoutPassword } from './user-types';

// a user controller is a class that handles the user routes (incoming frontend requests)
class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const user: CreateUserDto = req.body;
      const existingUser = await this.userService.getUserByEmail(user.email);
      if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(user.password, salt);
      const { password, ...userWithoutPassword } = user;
      const newUser: UserWithoutPassword = await this.userService.createUser({
        ...userWithoutPassword,
        passwordHash,
      });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      const usersWithoutPassword = users.map((user) => {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.status(200).json(usersWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const params = req.params;
      const id = parseInt(params.id);
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const { passwordHash, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default UserController;
