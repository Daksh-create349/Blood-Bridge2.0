import type { BloodResource, Donor, UrgentRequest, BloodBank, RequestHistoryItem } from './types';

export const MOCK_RESOURCES: BloodResource[] = [
  { id: '1', bloodType: 'A+', quantity: 50, location: 'City General Hospital', status: 'Available' },
  { id: '2', bloodType: 'O-', quantity: 10, location: 'City General Hospital', status: 'Low' },
  { id: '3', bloodType: 'B+', quantity: 5, location: 'Metro Health Center', status: 'Critical' },
  { id: '4', bloodType: 'AB+', quantity: 25, location: 'St. Jude\'s Clinic', status: 'Available' },
  { id: '5', bloodType: 'O+', quantity: 80, location: 'Red Cross Center', status: 'Available' },
  { id: '6', bloodType: 'A-', quantity: 15, location: 'County Medical', status: 'Low' },
  { id: '7', bloodType: 'B-', quantity: 3, location: 'City General Hospital', status: 'Critical' },
  { id: '8', bloodType: 'AB-', quantity: 8, location: 'Red Cross Center', status: 'Low' },
  { id: '9', bloodType: 'A+', quantity: 40, location: 'Apollo Hospital, Navi Mumbai', status: 'Available' },
  { id: '10', bloodType: 'O+', quantity: 35, location: 'MGM Hospital, Vashi', status: 'Available' },
  { id: '11', bloodType: 'B+', quantity: 20, location: 'Fortis Hiranandani Hospital, Vashi', status: 'Available' },
  { id: '12', bloodType: 'A+', quantity: 30, location: 'Reliance Hospital, Navi Mumbai', status: 'Available' },
  { id: '13', bloodType: 'B+', quantity: 30, location: 'MGM Hospital, Vashi', status: 'Available' },
  { id: '14', bloodType: 'A+', quantity: 30, location: 'Reliance Hospital, Navi Mumbai', status: 'Available' },
];

export const MOCK_ACTIVE_REQUESTS: UrgentRequest[] = [
    {
        id: 'req1',
        bloodType: 'O-',
        quantity: 5,
        hospital: 'City General Hospital',
        location: 'Downtown, Metro City',
        urgency: 'Critical',
        timePosted: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        status: 'Active',
    },
    {
        id: 'req2',
        bloodType: 'A+',
        quantity: 10,
        hospital: 'Metro Health Center',
        location: 'Uptown, Metro City',
        urgency: 'High',
        timePosted: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        status: 'Active',
    },
    {
        id: 'req3',
        bloodType: 'B-',
        quantity: 3,
        hospital: 'County Medical',
        location: 'Suburbia, Metro City',
        urgency: 'Moderate',
        timePosted: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        status: 'Active',
    }
];

export const MOCK_DONORS: Donor[] = [
  { id: 'd1', name: 'Aarav Sharma', bloodType: 'A+', location: 'Mumbai', lastDonation: '2024-05-15', contact: '9876543210' },
  { id: 'd2', name: 'Vivaan Singh', bloodType: 'O-', location: 'Delhi', lastDonation: '2024-04-20', contact: '9876543211' },
  { id: 'd3', name: 'Aditya Kumar', bloodType: 'B+', location: 'Bangalore', lastDonation: '2024-02-10', contact: '9876543212' },
  { id: 'd4', name: 'Vihaan Gupta', bloodType: 'AB+', location: 'Mumbai', lastDonation: '2024-06-01', contact: '9876543213' },
  { id: 'd5', name: 'Arjun Patel', bloodType: 'O+', location: 'Delhi', lastDonation: '2023-11-25', contact: '9876543214' },
  { id: 'd6', name: 'Sai Reddy', bloodType: 'A-', location: 'Hyderabad', lastDonation: '2024-01-05', contact: '9876543215' },
  { id: 'd7', name: 'Reyansh Mishra', bloodType: 'B-', location: 'Kolkata', lastDonation: '2024-03-22', contact: '9876543216' },
  { id: 'd8', name: 'Krishna Yadav', bloodType: 'AB-', location: 'Chennai', lastDonation: '2024-05-30', contact: '9876543217' },
  { id: 'd9', name: 'Ishaan Verma', bloodType: 'A+', location: 'Pune', lastDonation: '2024-02-18', contact: '9876543218' },
  { id: 'd10', name: 'Ayaan Khan', bloodType: 'O+', location: 'Ahmedabad', lastDonation: '2024-04-12', contact: '9876543219' },
  { id: 'd11', name: 'Ananya Sharma', bloodType: 'B+', location: 'Mumbai', lastDonation: '2024-05-01', contact: '9876543220' },
  { id: 'd12', name: 'Diya Singh', bloodType: 'A+', location: 'Delhi', lastDonation: '2024-03-10', contact: '9876543221' },
  { id: 'd13', name: 'Myra Kumar', bloodType: 'O-', location: 'Bangalore', lastDonation: '2024-06-05', contact: '9876543222' },
  { id: 'd14', name: 'Saanvi Gupta', bloodType: 'AB+', location: 'Kolkata', lastDonation: '2023-12-15', contact: '9876543223' },
  { id: 'd15', name: 'Aadhya Patel', bloodType: 'B-', location: 'Chennai', lastDonation: '2024-04-25', contact: '9876543224' },
  { id: 'd16', name: 'Kiara Reddy', bloodType: 'O+', location: 'Hyderabad', lastDonation: '2024-01-20', contact: '9876543225' },
  { id: 'd17', name: 'Priya Mishra', bloodType: 'A-', location: 'Pune', lastDonation: '2024-05-18', contact: '9876543226' },
  { id: 'd18', name: 'Riya Yadav', bloodType: 'AB-', location: 'Ahmedabad', lastDonation: '2024-02-28', contact: '9876543227' },
  { id: 'd19', name: 'Shanaya Verma', bloodType: 'B+', location: 'Mumbai', lastDonation: '2024-04-02', contact: '9876543228' },
  { id: 'd20', name: 'Zara Khan', bloodType: 'O-', location: 'Delhi', lastDonation: '2024-03-29', contact: '9876543229' },
];

export const MOCK_REQUEST_HISTORY: RequestHistoryItem[] = [
    {
        id: 'hist1',
        date: '2024-06-10',
        hospital: 'St. Jude\'s Clinic',
        bloodType: 'AB-',
        quantity: 2,
        status: 'Fulfilled',
        fulfilledBy: 'Jane Smith',
        location: 'St. Jude\'s Clinic',
        urgency: 'High',
        timePosted: new Date('2024-06-10T10:00:00Z').toISOString(),
    },
    {
        id: 'hist2',
        date: '2024-05-28',
        hospital: 'City General Hospital',
        bloodType: 'O-',
        quantity: 8,
        status: 'Fulfilled',
        fulfilledBy: 'Red Cross Center',
        location: 'City General Hospital',
        urgency: 'Critical',
        timePosted: new Date('2024-05-28T14:30:00Z').toISOString(),
    },
    {
        id: 'hist3',
        date: '2024-06-05',
        hospital: 'County Medical',
        bloodType: 'A+',
        quantity: 4,
        status: 'Expired',
        location: 'County Medical',
        urgency: 'Moderate',
        timePosted: new Date('2024-06-05T08:00:00Z').toISOString(),
    },
];


export const MOCK_BLOOD_BANKS: BloodBank[] = [
    { id: 'bb1', name: 'Metro Blood Bank', location: 'Downtown' },
    { id: 'bb2', name: 'Uptown Donation Center', location: 'Uptown' },
    { id: 'bb3', name: 'Suburban Community Bank', location: 'Suburbia' },
    { id: 'bb4', name: 'Red Cross Central', location: 'City Center' },
];
