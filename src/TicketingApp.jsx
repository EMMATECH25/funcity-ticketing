import { useState } from "react";

const TicketingApp = () => {
  const [tickets, setTickets] = useState({
    adult: 0,
    child: 0,
    senior: 0,
  });

  const prices = {
    adult: 50,
    child: 30,
    senior: 40,
  };

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [step, setStep] = useState(1); // 1 = ticket select, 2 = user info, 3 = confirmation

  const handleTicketChange = (type, value) => {
    const val = Math.max(0, Number(value));
    setTickets((prev) => ({ ...prev, [type]: val }));
  };

  const total =
    tickets.adult * prices.adult +
    tickets.child * prices.child +
    tickets.senior * prices.senior;

  const handleUserChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canProceedToUserForm = total > 0;
  const canConfirm =
    userInfo.fullName.trim() !== "" &&
    userInfo.email.trim() !== "" &&
    userInfo.phone.trim() !== "";

  return (
    <div className="ticketing-app-container">
      {step === 1 && (
        <>
          <h1 className="heading">Select Your Tickets</h1>
          <p className="instruction">
            Please select the number of tickets you want and then click "Proceed to Checkout".
          </p>
          {Object.keys(tickets).map((type) => (
            <div key={type} className="ticket-row">
              <div className="ticket-label">
                {type} Ticket (${prices[type]})
              </div>
              <input
                type="number"
                min="0"
                value={tickets[type]}
                onChange={(e) => handleTicketChange(type, e.target.value)}
                className="ticket-input"
              />
            </div>
          ))}
          <hr className="separator" />
          <p className="total">Total: ${total.toFixed(2)}</p>

          <button
            disabled={!canProceedToUserForm}
            onClick={() => setStep(2)}
            className={`btn proceed-btn ${
              canProceedToUserForm ? "" : "disabled"
            }`}
          >
            Proceed to Checkout
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="heading">Enter Your Information</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canConfirm) setStep(3);
            }}
          >
            <label className="form-label">
              Full Name
              <input
                type="text"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleUserChange}
                required
                className="form-input"
              />
            </label>
            <label className="form-label">
              Email
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleUserChange}
                required
                className="form-input"
              />
            </label>
            <label className="form-label">
              Phone Number
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleUserChange}
                required
                className="form-input"
              />
            </label>
            <div className="button-group">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn back-btn"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!canConfirm}
                className={`btn confirm-btn ${
                  canConfirm ? "" : "disabled"
                }`}
              >
                Confirm
              </button>
            </div>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="heading">Confirmation</h1>
          <p className="confirmation-text">
            Thank you, <strong>{userInfo.fullName}</strong>! Your tickets have
            been booked.
          </p>
          <p className="confirmation-text">Email: {userInfo.email}</p>
          <p className="confirmation-text">Phone: {userInfo.phone}</p>

          <h2 className="subheading">Ticket Summary</h2>
          <ul className="ticket-summary-list">
            {Object.entries(tickets).map(([type, qty]) =>
              qty > 0 ? (
                <li key={type}>
                  {qty} x {type.charAt(0).toUpperCase() + type.slice(1)} Ticket(s)
                  - ${(qty * prices[type]).toFixed(2)}
                </li>
              ) : null
            )}
          </ul>
          <p className="total-paid">Total Paid: ${total.toFixed(2)}</p>

          <button
            onClick={() => {
              setTickets({ adult: 0, child: 0, senior: 0 });
              setUserInfo({ fullName: "", email: "", phone: "" });
              setStep(1);
            }}
            className="btn proceed-btn"
          >
            Book More Tickets
          </button>
        </>
      )}
    </div>
  );
};

export default TicketingApp;
