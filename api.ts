import { User, Shipment } from './App';

// MOCK DATABASE
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@test.com', role: 'user' },
  { id: '2', name: 'Jane Admin', email: 'admin@test.com', role: 'admin' },
];

let shipments: Shipment[] = [
    { id: '1', userId: '1', trackingId: 'CM123456789', courier: 'FedEx', origin: 'New York, NY', destination: 'Los Angeles, CA', status: 'In Transit', updates: [
        { timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), location: 'New York, NY', status: 'Package picked up' },
        { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), location: 'Chicago, IL', status: 'Arrived at hub' },
    ] },
    { id: '2', userId: '1', trackingId: 'CM987654321', courier: 'DHL', origin: 'London, UK', destination: 'Paris, France', status: 'Delivered', updates: [
        { timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), location: 'London, UK', status: 'Package picked up' },
        { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), location: 'Paris, France', status: 'Delivered' },
    ] },
    { id: '3', userId: '2', trackingId: 'CM555555555', courier: 'UPS', origin: 'Berlin, Germany', destination: 'Rome, Italy', status: 'Out for Delivery', updates: [
        { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), location: 'Berlin, Germany', status: 'Package picked up' },
        { timestamp: new Date().toISOString(), location: 'Rome, Italy', status: 'Out for Delivery' },
    ] },
];
let nextUserId = 3;
let nextShipmentId = 4;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    const user = users.find(u => u.email === email);
    if (user && password) { // Mocking password check
      return user;
    }
    throw new Error('Invalid email or password.');
  },

  signup: async (name: string, email: string): Promise<void> => {
    await delay(1000);
    if (users.some(u => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: User = {
      id: String(nextUserId++),
      name,
      email,
      role: 'user',
    };
    users.push(newUser);
  },
  
  updateUserProfile: async (userData: User): Promise<User> => {
    await delay(1000);
    const userIndex = users.findIndex(u => u.id === userData.id);
    if (userIndex === -1) {
      throw new Error('User not found.');
    }
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
  },

  getUserShipments: async (userId: string): Promise<Shipment[]> => {
    await delay(500);
    return shipments.filter(s => s.userId === userId);
  },
  
  getShipmentById: async(shipmentId: string): Promise<Shipment> => {
    await delay(500);
    const shipment = shipments.find(s => s.id === shipmentId);
    if (!shipment) {
      throw new Error('Shipment not found.');
    }
    return shipment;
  },

  bookShipment: async (userId: string, courier: string, details: { origin: string, destination: string }): Promise<Shipment> => {
    await delay(1500);
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found.');
    }
    const newShipment: Shipment = {
        id: String(nextShipmentId++),
        userId,
        courier,
        trackingId: `CM${Math.floor(100000000 + Math.random() * 900000000)}`,
        origin: details.origin,
        destination: details.destination,
        status: 'Booked',
        updates: [{
            timestamp: new Date().toISOString(),
            status: 'Shipment information received',
            location: details.origin,
        }],
    };
    shipments.push(newShipment);
    return newShipment;
  },

  // Admin functions
  getAllUsers: async (): Promise<User[]> => {
    await delay(500);
    return users;
  },
  
  getAllShipments: async (): Promise<Shipment[]> => {
    await delay(500);
    return shipments;
  },

  updateShipmentStatus: async (shipmentId: string, status: string, location: string): Promise<Shipment> => {
     await delay(700);
     const shipmentIndex = shipments.findIndex(s => s.id === shipmentId);
     if (shipmentIndex === -1) {
        throw new Error("Shipment not found");
     }
     shipments[shipmentIndex].status = status;
     shipments[shipmentIndex].updates.push({
         timestamp: new Date().toISOString(),
         status,
         location
     });
     // sort updates by date descending
     shipments[shipmentIndex].updates.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
     return shipments[shipmentIndex];
  }
};
