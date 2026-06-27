import type { User } from "./UserGrid"

function UserCard({ user }: { user: User }) {
    return (
        <div className="flex flex-wrap gap-x-4 gap-y-3 p-4 bg-white shadow-md rounded-xl border border-gray-300">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.location}</p>
            </div>

            <div className="w-full flex flex-wrap gap-2">
                {user.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            
        </div>
    );
}
export default UserCard;       
