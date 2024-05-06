import { useParams } from "react-router-dom";

export default function UserProfilePage() {
    const PARAMS = useParams<{ profileId: string }>();

    return (
        <div>User Profile {PARAMS.profileId}</div>
    )
}