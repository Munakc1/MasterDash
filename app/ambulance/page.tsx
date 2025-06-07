import MasterTable from './components/MasterTable';

export default function DashboardPage() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Patient Records</h1>
      <MasterTable />
    </div>
  );
}
