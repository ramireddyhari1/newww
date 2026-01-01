import { NextResponse } from "next/server";

export async function GET() {
    // Mock inventory and sales velocity data
    const inventoryData = [
        { id: "P001", name: "Black Rice", currentStock: 50, avgDailySales: 5, leadTimeDays: 7 },
        { id: "P002", name: "Organic Jaggery", currentStock: 200, avgDailySales: 8, leadTimeDays: 5 },
        { id: "P003", name: "Raw Honey", currentStock: 15, avgDailySales: 4, leadTimeDays: 10 },
        { id: "P004", name: "Turmeric Powder", currentStock: 80, avgDailySales: 1, leadTimeDays: 15 },
    ];

    const detailedForecast = inventoryData.map(item => {
        const daysRemaining = Math.floor(item.currentStock / item.avgDailySales);
        let status = "Healthy";
        let recommendation = "No Action Needed";
        let riskLevel = "Low";

        if (daysRemaining < item.leadTimeDays + 2) {
            status = "Critical (Stockout Risk)";
            recommendation = `Restock immediately! (Min order: ${item.avgDailySales * 14} units)`;
            riskLevel = "High";
        } else if (daysRemaining < 15) {
            status = "Low Stock";
            recommendation = "Plan restock soon";
            riskLevel = "Medium";
        } else if (daysRemaining > 60) {
            status = "Overstocked";
            recommendation = "Run a discount promotion";
            riskLevel = "Medium";
        }

        return {
            ...item,
            daysRemaining,
            status,
            recommendation,
            riskLevel
        };
    });

    return NextResponse.json({
        generatedAt: new Date().toISOString(),
        insights: detailedForecast
    });
}
