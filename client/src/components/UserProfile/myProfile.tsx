

export default function MyProfile(props: { user: { email: string; username: string; } }) {
    const { user } = props;
    const { username, email } = user;

    return (
        <div>
            <h4>My Profile</h4>
            <div>
                <p><strong>User Name:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
            </div>
        </div>
    );
}
