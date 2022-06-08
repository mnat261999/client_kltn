import { ButtonProps } from "antd";

export const IconButtonConfig: ButtonProps = {
    size: 'large',
    shape: "circle",
    type: 'text'
}

export const ProfileButtonConfig: ButtonProps = {
    ...IconButtonConfig,
    shape: "round",
}