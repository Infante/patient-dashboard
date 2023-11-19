// Layout for all Dashboard Routes

// Import components
import Layout from "@/components/tailwind/Layout"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <Layout>{children}</Layout>
}
