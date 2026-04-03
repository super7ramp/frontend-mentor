import "react";

declare module "react" {
  interface ButtonHTMLAttributes {
    command?: string;
    commandfor?: string;
  }
}
