import '../App.css';

export default function CurrentLoginUserComponent() {
    const userType = sessionStorage.getItem("userType");
    return(
        <div>
            <p>You are logged in as {userType}.</p>
        </div>
    );
}
