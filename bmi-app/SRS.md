# Software Requirements Specification (SRS) - BMI Tracking Web Application

## 1. Introduction
This document outlines the requirements for a multi-user BMI (Body Mass Index) tracking web application. The application will allow users to track their health data and provide management with summary reports (MIS).

## 2. System Overview
The application is a modern web-based platform where users can register, log in, and record their weight and height to calculate and track their BMI over time. Administrators or specific roles can access Management Information System (MIS) reports to analyze trends.

## 3. Technology Stack
- **Framework**: Next.js (Latest version)
- **Database**: SQLite
- **Styling**: Vanilla CSS / CSS Modules
- **Authentication**: NextAuth.js or custom JWT-based authentication
- **ORM**: Prisma or Drizzle (recommended for SQLite interaction)

## 4. Functional Requirements

### 4.1 User Management
- **Registration**: Users can create an account using email and password.
- **Authentication**: Secure login/logout functionality.
- **Profile**: Users can update their basic profile information (Name, Age, Gender).

### 4.2 BMI Calculation & Recording
- **Data Input**: Users can enter weight (kg) and height (cm).
- **Calculation**: System automatically calculates BMI index and classifies it (Underweight, Normal, Overweight, Obese).
- **History Tracking**: Users can view their previous records in a table or list format.
- **Data Persistence**: All records are saved in the SQLite database with timestamps.

### 4.3 Management Information System (MIS) Reports
The system will provide summarized reports for data analysis across different timeframes:
- **Daily Report**: Summary of BMI entries and average BMI for the current day.
- **Weekly Report**: Statistical breakdown and trends for the past 7 days.
- **Monthly Report**: Analysis of user data aggregated by month.
- **Yearly Report**: Annual summary showing trends and distributions over the year.
- **Key Metrics**:
    - Total number of records.
    - Average BMI of all users.
    - Distribution of BMI categories (e.g., % of Normal weight vs % Overweight).

## 5. Non-Functional Requirements
- **Performance**: Reports should generate in under 2 seconds.
- **Security**: User passwords must be hashed. Only authorized users can see MIS reports.
- **Responsiveness**: The UI must be fully responsive (Mobile, Tablet, Desktop).
- **Usability**: Clean and modern interface as per brand guidelines.

## 6. Database Schema (Draft)

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `name`
- `role` (User / Admin)
- `created_at`

### BMI_Records Table
- `id` (Primary Key)
- `userId` (Foreign Key)
- `weight`
- `height`
- `bmi_score`
- `category`
- `recorded_at`

## 7. UI/UX Design Concepts
- **Dashboard**: A summary of the last BMI entry and a quick-add form.
- **History Page**: A detailed list of all entries with filter/search capability.
- **Reports Page**: Interactive charts and summary tables for MIS data.
