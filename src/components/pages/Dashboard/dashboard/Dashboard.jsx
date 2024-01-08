import LineChartWithdraw from "./LineChartWithdraw";
import LineChartTransaction from "./LineChartTransaction";
import TotalDashboard from "./TotalDashboard";

export default function Dashboard() {
  let isDashboard = false;
  try {
    const dataLocal = JSON.parse(localStorage.privilege);
    isDashboard = dataLocal.dashboardView;
  } catch (error) {
    console.error("Error parsing localStorage.privilege:", error);
  }
  return (
    <>
      {!isDashboard ? (
        <div className="welcome-message">
          <h3 className="text-white">Selamat datang di ewa dashboard!</h3>
        </div>
      ) : (
        <>
          <TotalDashboard />

          <LineChartWithdraw />

          <LineChartTransaction />
        </>
      )}
    </>
  );
}
