# Project Name

This project consists of a frontend (Angular) and a backend (Node.js with Express and TypeScript). The following instructions will guide you through building the Docker images for both the frontend and backend services using the provided shell script.

## Prerequisites

Ensure you have the following installed on your system:

- **Docker**: Install Docker from [here](https://docs.docker.com/get-docker/).
- **Git Bash (Windows only)**: This script is a shell script (`.sh`). On Windows, you will need Git Bash or a similar terminal that can run shell scripts.

## Building Docker Images

The `build_images.sh` script is used to build the Docker images for both the frontend and backend services.

### Running the Script on macOS and Linux

1. **Open a Terminal**:
   - Navigate to the root directory of your project where the `build_images.sh` script is located.

2. **Make the Script Executable** (if not already done):
   - Run the following command to ensure the script is executable:
     ```bash
     chmod +x build_images.sh
     ```

3. **Run the Script**:
   - Execute the script by running:
     ```bash
     ./build_images.sh
     ```

   This will trigger the Docker build process for both the frontend and backend images.

### Running the Script on Windows

1. **Open Git Bash**:
   - Navigate to the root directory of your project where the `build_images.sh` script is located. You can do this by right-clicking in the project directory and selecting "Git Bash Here".

2. **Run the Script**:
   - Execute the script by running:
     ```bash
     ./build_images.sh
     ```

   This will trigger the Docker build process for both the frontend and backend images.

> **Note**: Windows users need to use Git Bash or another terminal that supports Unix-like shell commands, as `.sh` scripts are not natively supported by the Windows Command Prompt or PowerShell.

### Troubleshooting

- If you encounter permission issues on macOS or Linux, ensure that the `build_images.sh` script has the appropriate execute permissions by running:
  ```bash
  chmod +x build_images.sh
