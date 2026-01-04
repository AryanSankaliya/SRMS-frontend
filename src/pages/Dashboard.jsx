
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";




export default function Dashboard({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="flex flex-col flex-1">
        <Header/>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
