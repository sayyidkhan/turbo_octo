import '../App.css';

export default function CurrentLoginUserComponent() {
    const userType = sessionStorage.getItem("userType") ?? "P";
    let userType_full = "Public";

    switch(userType){
        case "G": userType_full = "Government Admin"; break;
        case "H": userType_full = "Health Staff"; break;
        case "B": userType_full = "Business"; break;
        default: userType_full = "Public";
    }

    return(
        <div>
            <p>You are logged in as {userType_full}.</p>
        </div>
    );
}
