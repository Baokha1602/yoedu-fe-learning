import Header from "./components/Header";
import UserGrid from "./UserGrid";

function UserPage() {
    return (
        <div className="min-h-screen bg-slate-200 flex items-center justify-center p-10">
            <div className="w-full max-w-6xl bg-white rounded-lg  p-10">
                <Header />
                <UserGrid />
            </div>
        </div>
    );
}
export default UserPage;