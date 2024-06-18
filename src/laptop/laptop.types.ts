export type Laptop = {
  title: string;
  price: number;
  image: string;
};

export const laptopExampleJSONString = `
{
  "laptop": {
    "brand": "Dell", // The manufacturer of the laptop
    "model": "XPS 15 9500", // The specific model of the laptop
    "processor": {
      "brand": "Intel", // The manufacturer of the processor (CPU)
      "model": "Core i7-10750H", // The specific model of the CPU
      "base_clock_speed": "2.6 GHz", // The base operating frequency of the CPU
      "max_turbo_speed": "5.0 GHz", // The maximum frequency the CPU can reach with Turbo Boost
      "cores": 6, // The number of physical cores in the CPU
      "threads": 12, // The number of threads the CPU can handle (often double the number of cores)
      "cache": "12 MB" // The amount of cache memory in the CPU
    },
    "memory": {
      "type": "DDR4", // The type of RAM used
      "capacity": "16 GB", // The amount of RAM
      "speed": "2933 MHz" // The operating frequency of the RAM
    },
    "storage": {
      "type": "SSD", // The type of storage drive
      "capacity": "512 GB", // The storage capacity
      "interface": "NVMe" // The interface used for the storage drive
    },
    "display": {
      "size": "15.6 inches", // The diagonal size of the display
      "resolution": "3840 x 2400", // The resolution of the display
      "type": "OLED", // The type of display panel
      "refresh_rate": "60 Hz", // The refresh rate of the display
      "touch_screen": true // Indicates if the display is touch-enabled
    },
    "graphics": {
      "brand": "NVIDIA", // The manufacturer of the graphics card (GPU)
      "model": "GeForce GTX 1650 Ti", // The specific model of the GPU
      "vram": "4 GB", // The amount of video RAM in the GPU
      "type": "GDDR6" // The type of memory used in the GPU
    },
    "battery": {
      "capacity": "86 Wh", // The capacity of the battery in watt-hours
      "type": "Lithium-Ion", // The type of battery
      "life": "up to 10 hours" // The estimated battery life under typical usage
    },
    "operating_system": "Windows 10 Home", // The operating system installed on the laptop
    "ports": {
      "usb_type_c": 3, // The number of USB Type-C ports
      "usb_type_a": 1, // The number of USB Type-A ports
      "hdmi": 1, // The number of HDMI ports
      "headphone_jack": 1, // The number of headphone jacks
      "sd_card_reader": 1 // The number of SD card readers
    },
    "wireless": {
      "wifi": "Wi-Fi 6 (802.11ax)", // The Wi-Fi standard supported
      "bluetooth": "Bluetooth 5.1" // The Bluetooth version supported
    },
    "dimensions": {
      "width": "344.72 mm", // The width of the laptop
      "depth": "230.14 mm", // The depth of the laptop
      "height": "18 mm" // The height (thickness) of the laptop
    },
    "weight": "1.83 kg", // The weight of the laptop
    "price": "1899.99 USD", // The price of the laptop
    "warranty": {
      "period": "1 year", // The duration of the warranty
      "type": "Limited Warranty" // The type of warranty provided
    }
  }
}
`;
