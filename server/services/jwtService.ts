import jwt from "jsonwebtoken"; 
export async function getToken(id: string, type: "access" | "refresh") {
  const secret = "tOVcZHkaE6g1cqrooW8I8P6PfCIzI2F4sFSARDF240EiLmRrHzkvnxHZi9pxLuwNJ3XJPd6LDnYdwbO57GVuj6dLX2YJFdgv4r3xUXWoAt4VynI5aBekKQ58tqLw0RYI6lBUTPKh30B7BS5l3IYBOonN63gvyzoZaudM58sD9e11yRM3ONw7xDRiZcrUN"
  const expiresIn = type == "access" ? "15m" : "7d";
  const token = jwt.sign({ id }, secret, { expiresIn });
  return token;
}
export async function verify(token: string) {
  const secret = "tOVcZHkaE6g1cqrooW8I8P6PfCIzI2F4sFSARDF240EiLmRrHzkvnxHZi9pxLuwNJ3XJPd6LDnYdwbO57GVuj6dLX2YJFdgv4r3xUXWoAt4VynI5aBekKQ58tqLw0RYI6lBUTPKh30B7BS5l3IYBOonN63gvyzoZaudM58sD9e11yRM3ONw7xDRiZcrUN"
  const decoded = jwt.verify(token, secret);
  return decoded;
}
