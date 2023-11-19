// Loading Page Component
// Description: Loading page component, shown when a page is loading or when checking if user is logged in
import Image from "next/image"

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Image
                className="animate-spin-slow"
                src="/fox.svg"
                width={200}
                height={200}
                alt="Finni Fox"
            />
        </div>
    )
}

export default Loading
