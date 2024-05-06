import { NavLink, Outlet } from "react-router-dom"

export default function UserProfilesPage() {
    const PROFILES = [1,2,3,4,5];

    return (
        <div className="row">
            <div className="col-md-5">
                <ul>
                    {PROFILES.map((profile) => (
                        <li key={profile}>
                            <NavLink 
                                to={`/user-profiles/${profile}`}
                                className={({isActive}) => {
                                    return isActive ? "text-primary" : "text-secondary"
                                }}
                            >
                                User Profile {profile}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-md-7">
                <Outlet />
            </div>
        </div>
    )
}