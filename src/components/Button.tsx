/**
 * Button Component
 *
 * A customizable button component for user interaction.
 *
 * Props:
 * - `classes`: string - Additional CSS classes for styling the button.
 * - `text`: string - Text to be displayed on the button.
 * - `type`: "primary" | "secondary" - Determines the button style.
 *   'primary' for the primary button style, 'secondary' for the secondary style.
 * - `onClick`: () => void - Function to execute when the button is clicked.
 * - `icon`: JSX.Element (optional) - Icon element to display on the button.
 * - `loading`: boolean (optional) - If true, the button will be disabled and show a loading state.
 */

const Button = ({
    classes,
    text,
    type,
    onClick,
    icon,
    loading = false,
}: {
    classes?: string
    text: string
    type: "primary" | "secondary"
    onClick?: () => void
    icon?: JSX.Element
    loading?: boolean
}) => {
    return (
        <button
            className={`${classes} p-2 rounded-md ${
                type === "primary"
                    ? "bg-primary"
                    : "bg-white border border-stroke"
            } ${type === "primary" ? "text-white" : "text-black"} 
            ${loading ? "opacity-70 cursor-not-allowed" : ""}
            hover:opacity-70
            transition
            duration-200
            text-sm
            flex
            justify-center
            items-center
            font-medium
        `}
            disabled={loading}
            type={type === "primary" ? "submit" : "button"}
            onClick={onClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {text}
        </button>
    )
}

export default Button
