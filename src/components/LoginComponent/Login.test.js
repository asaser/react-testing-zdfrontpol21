import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: {
        name: "John", 
        username: "Cookie"
      },
    }),
  },
}));



describe("Login", () => {
  test("username input should be rendered", () => {
    render(<Login />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl).toBeInTheDocument();
  });

  test("password input should be rendered", () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl).toBeInTheDocument();
  });

  test("button should be rendered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
  });

  // nie chcemy abyśmy mieli nic w input
  // <input type='text' placeholder="username" value="username" />
  test("username input should be empty", () => {
    render(<Login />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl.value).toBe("");
  });

  // nie chcemy abyśmy mieli nic w input
  // <input type='password' placeholder="password" value="password" />
  test("password input should be empty", () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl.value).toBe("");
  });

  // wciąż możemy klikać na przycisk a chcielibyśmy aby był nieaktywny
  test("button should be disabled", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeDisabled();
  });

  // powinno się to zmienić jeśli wpisujemy coś do username
  // onChange={(e) => setUsername(e.target.value)}
  test("username input should change", () => {
    render(<Login />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const testValue = "test";

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
  });

  // powinno się to zmienić jeśli wpisujemy coś do password
  // onChange={(e) => setUsername(e.target.value)}
  test("password input should change", () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    const testValue = "test";

    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });

  // wciąż pomimo, że mamy wpisane wartości to przycisk jest nieaktywny
  test("button should not be disabled when inputs exist", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });

    expect(buttonEl).not.toBeDisabled();
  });

  // do ładowania
  test("loading should not be rendered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).not.toHaveTextContent(/please wait/i);
  });

  test("loading should be rendered when click", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    expect(buttonEl).toHaveTextContent(/please wait/i);
  });

  // dodajemy tutaj async ponieważ będziemy ładować dane
  test("loading should not be rendered after fetching", async () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
  });

  test("user should be rendered after fetching", async () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const usernameInputEl = screen.getByPlaceholderText("username");
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    // czekamy aż nasze dane się załadują "Leanne Graham"
    await waitFor(() => {
      // czekamy dodatkową 1 s aby nasz program mógł znaleźć odpowiednie dane
      setTimeout(() => {
        const userItem = screen.getByText("John");
        expect(userItem).toBeInTheDocument();
      }, 1000);
    });
  });
});
