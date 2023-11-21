// Description: Analytic Card component that displays the analytic card.

const AnalyticCard = ({ title, value }: { title: string; value: string }) => {
    return (
        <div className="flex-1 rounded-lg border bg-white p-4">
            <h5 className="text-sm">{title}</h5>
            <h1 className="text-2xl font-bold">{value}</h1>
        </div>
    )
}

export default AnalyticCard
