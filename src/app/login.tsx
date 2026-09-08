import { FormEvent, useState } from "react";

export type Operator = {
    id: string;
    name: string;
    role: string;
    password: string;
};

export const OPERATORS: Operator[] = [
    {
        id: "OPR-01",
        name: "Raj Kumar",
        role: "Senior Operator",
        password: "1234",
    },
    {
        id: "OPR-02",
        name: "Arun Kumar",
        role: "Operator",
        password: "1234",
    },
    {
        id: "OPR-03",
        name: "Priya Sharma",
        role: "Operator",
        password: "1234",
    },
    {
        id: "ADM-01",
        name: "Administrator",
        role: "Administrator",
        password: "admin123",
    },
];

type LoginProps = {
    onLogin: (operator: Operator) => void;
};

export default function Login({ onLogin }: LoginProps) {
    const [operatorId, setOperatorId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();

        const operator = OPERATORS.find(
            (user) =>
                user.id.toLowerCase() === operatorId.trim().toLowerCase() &&
                user.password === password
        );

        if (!operator) {
            setError("Invalid Operator ID or password");
            return;
        }

        setError("");
        onLogin(operator);
    };

    return (
        <div className="login-page">
            <div className="login-glow" />

            <div className="login-card">
                <div className="login-logo">
                    <div className="logo-mark">P</div>
                    <div>
                        <h1>PheNex</h1>
                        <p>INTELLIGENT BORDER VIDEO ANALYTICS</p>
                    </div>
                </div>

                <div className="login-header">
                    <span className="status-dot" />
                    <span>SYSTEM ONLINE</span>
                </div>

                <h2>Operator Login</h2>
                <p className="login-subtitle">
                    Sign in to access the Command Center
                </p>

                <form onSubmit={handleLogin}>
                    <label>OPERATOR ID</label>

                    <input
                        type="text"
                        value={operatorId}
                        onChange={(e) => setOperatorId(e.target.value)}
                        placeholder="e.g. OPR-01"
                        autoComplete="username"
                    />

                    <label>PASSWORD</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        autoComplete="current-password"
                    />

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" className="login-button">
                        LOGIN TO COMMAND CENTER
                    </button>
                </form>

                <div className="demo-accounts">
                    <p>DEMO ACCESS</p>

                    <div>
                        <span>OPR-01</span>
                        <span>1234</span>
                    </div>

                    <div>
                        <span>OPR-02</span>
                        <span>1234</span>
                    </div>

                    <div>
                        <span>OPR-03</span>
                        <span>1234</span>
                    </div>
                </div>

                <div className="login-footer">
                    PheNex Security Operations • Authorized Access Only
                </div>
            </div>
        </div>
    );
}