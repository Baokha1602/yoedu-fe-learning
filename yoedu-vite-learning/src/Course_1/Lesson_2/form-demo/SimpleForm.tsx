import { useState } from "react";

/* Quản lý form state theo từng field */
function SimpleForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />

            <button type="submit">Submit</button>
        </form>
    );
}

export default SimpleForm;