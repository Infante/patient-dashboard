/**
 * Input Component
 *
 * Description:
 * A reusable input component for forms.
 *
 * Props:
 * - `classes`: string - Additional CSS classes for custom styling.
 * - `name`: string - The name of the input, used to identify it in forms.
 * - `value`: string - The current value of the input.
 * - `setValue`: (value: string) => void - Function to update the value of the input.
 * - `placeholder`: string - Placeholder text to display when the input is empty.
 * - `type`: string - The type of input (e.g., 'text', 'email', 'password').
 * - `required`: boolean (optional) - If true, the input is required to be filled.
 */

const Input = ({
    classes,
    name,
    value,
    setValue,
    placeholder,
    type,
    required = false,
}: {
    classes: string
    name: string
    value: string
    setValue: (value: string) => void
    placeholder: string
    type: string
    required?: boolean
}) => {
    return (
        <input
            className={`${classes} p-2 text-base rounded-md border border-[#b6a896] focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]`}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            type={type}
            required={required}
        />
    )
}

export default Input
