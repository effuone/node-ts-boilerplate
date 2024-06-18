import openai from '../openai';
import { Laptop, laptopExampleJSONString } from './laptop.types';
import * as fs from 'fs/promises';
import path from 'path';

const retrievalPrompt = `
You are a professional IT specialist who can structure all the technical specifications of a laptop into a structured format. Please provide the following information about a laptop in an unstructured text, and then convert it into the structured JSON format provided below:

Unstructured Information:
"
  Brand: Dell
  Model: XPS 15 9500
  Processor: Intel Core i7-10750H, 2.6 GHz base clock, 5.0 GHz max turbo, 6 cores, 12 threads, 12 MB cache
  Memory: 16 GB DDR4 RAM at 2933 MHz
  Storage: 512 GB NVMe SSD
  Display: 15.6-inch OLED, 3840 x 2400 resolution, 60 Hz, touch screen
  Graphics: NVIDIA GeForce GTX 1650 Ti with 4 GB GDDR6 VRAM
  Battery: 86 Wh Lithium-Ion, up to 10 hours battery life
  Operating System: Windows 10 Home
  Ports: 3 USB Type-C, 1 USB Type-A, 1 HDMI, 1 headphone jack, 1 SD card reader
  Wireless: Wi-Fi 6 (802.11ax), Bluetooth 5.1
  Dimensions: 344.72 mm width, 230.14 mm depth, 18 mm height
  Weight: 1.83 kg
  Price: 1899.99 USD
  Warranty: 1 year limited warranty
"

Structured JSON Format:
"
{
  "laptop": {
    "brand": "Dell",
    "model": "XPS 15 9500",
    "processor": {
      "brand": "Intel",
      "model": "Core i7-10750H",
      "base_clock_speed": "2.6 GHz",
      "max_turbo_speed": "5.0 GHz",
      "cores": 6,
      "threads": 12,
      "cache": "12 MB"
    },
    "memory": {
      "type": "DDR4",
      "capacity": "16 GB",
      "speed": "2933 MHz"
    },
    "storage": {
      "type": "SSD",
      "capacity": "512 GB",
      "interface": "NVMe"
    },
    "display": {
      "size": "15.6 inches",
      "resolution": "3840 x 2400",
      "type": "OLED",
      "refresh_rate": "60 Hz",
      "touch_screen": true
    },
    "graphics": {
      "brand": "NVIDIA",
      "model": "GeForce GTX 1650 Ti",
      "vram": "4 GB",
      "type": "GDDR6"
    },
    "battery": {
      "capacity": "86 Wh",
      "type": "Lithium-Ion",
      "life": "up to 10 hours"
    },
    "operating_system": "Windows 10 Home",
    "ports": {
      "usb_type_c": 3,
      "usb_type_a": 1,
      "hdmi": 1,
      "headphone_jack": 1,
      "sd_card_reader": 1
    },
    "wireless": {  Brand: Dell
      Model: XPS 15 9500
      Processor: Intel Core i7-10750H, 2.6 GHz base clock, 5.0 GHz max turbo, 6 cores, 12 threads, 12 MB cache
      Memory: 16 GB DDR4 RAM at 2933 MHz
      Storage: 512 GB NVMe SSD
      Display: 15.6-inch OLED, 3840 x 2400 resolution, 60 Hz, touch screen
      Graphics: NVIDIA GeForce GTX 1650 Ti with 4 GB GDDR6 VRAM
      Battery: 86 Wh Lithium-Ion, up to 10 hours battery life
      Operating System: Windows 10 Home
      Ports: 3 USB Type-C, 1 USB Type-A, 1 HDMI, 1 headphone jack, 1 SD card reader
      Wireless: Wi-Fi 6 (802.11ax), Bluetooth 5.1
      Dimensions: 344.72 mm width, 230.14 mm depth, 18 mm height
      Weight: 1.83 kg
      Price: 1899.99 USD
      Warranty: 1 year limited warranty
      "wifi": "Wi-Fi 6 (802.11ax)",
      "bluetooth": "Bluetooth 5.1"
    },
    "dimensions": {
      "width": "344.72 mm",
      "depth": "230.14 mm",
      "height": "18 mm"
    },
    "weight": "1.83 kg",
    "price": "1899.99 USD",
    "warranty": {
      "period": "1 year",
      "type": "Limited Warranty"
    }
  }
}"

Please transform the unstructured information into the structured JSON format provided.
`;

class LaptopService {
  async retrieveLaptops() {
    try {
      const filePath = path.join(__dirname, 'laptop.data.json');
      console.log(filePath);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading file:', err);
      throw err;
    }
  }

  async recommendLaptops(laptops: Laptop[], userPrompt: string) {
    try {
      return await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
            You are professional IT specialist who knows all the latest trends in the laptop industry.
            You should recommend a laptop to a user based on their preferences.
            You will get an input array of laptops and their technical specifications.
            For example, a single object may look something like this: ${laptopExampleJSONString}
            User will write their preferences in a text format. You should take this text into the consideration and recommend the best laptop based on the user's preferences.
            You should decide which laptop is the best for the user based on their preferences.
            Return at least 3 laptops to choose from in the following JSON format:
          `,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Here are the laptops ${JSON.stringify(laptops)}`,
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `This is my laptop preferences: ${userPrompt}`,
              },
            ],
          },
        ],
        response_format: {
          type: 'json_object',
        },
      });
    } catch (e: any) {
      console.log(e.message);
    }
  }
}

export default LaptopService;
