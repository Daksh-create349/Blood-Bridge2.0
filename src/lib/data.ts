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
  { id: 'd1', name: 'John Doe', bloodType: 'A+', location: 'Downtown', lastDonation: '2024-03-15', contact: '555-1234' },
  { id: 'd2', name: 'Jane Smith', bloodType: 'O-', location: 'Uptown', lastDonation: '2024-05-20', contact: '555-5678' },
  { id: 'd3', name: 'Peter Jones', bloodType: 'B+', location: 'Suburbia', lastDonation: '2024-01-10', contact: '555-9012' },
  { id: 'd4', name: 'Mary Johnson', bloodType: 'AB+', location: 'Downtown', lastDonation: '2024-06-01', contact: '555-3456' },
  { id: 'd5', name: 'David Williams', bloodType: 'O+', location: 'Uptown', lastDonation: '2023-12-25', contact: '555-7890' },
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
