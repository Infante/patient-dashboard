# Patient Management Dashboard

A streamlined solution for healthcare providers, focusing on efficient patient data management.

## Problem Statement

Providers are frustrated with current patient management dashboards and seek an improved system for handling essential patient information, including names, dates of birth, statuses, multiple addresses, and custom data fields.

## Solution Overview

This web-based application facilitates:

### Analytics

-   **Total Patient Count**: A quick view of the total number of patients.
-   **Patients per Status**: Breakdown of patients according to statuses like Inquiry, Onboarding, Active, and Churned.
-   **Address Visualization**: Insightful display of patients' geographical distribution.

### Patient Management

-   **Field-Based Filtering**: Enables sorting and filtering by various patient data fields.
-   **Quick Search**: Easy search functionality for accessing patient records.
-   **Comprehensive Record Display**: Detailed presentation of patient records, including names, DOB, status, addresses, and additional custom fields.

### Patient Profiles

-   **Detailed Patient Overviews**: In-depth profiles for each patient.
-   **Insurance Information**: Dedicated section for insurance card details.
-   **Document Uploading**: Capability for uploading and storing patient-related documents.

## Technical Stack

-   **Next.js**: Facilitates rapid development of both frontend and backend.
-   **Firebase**: Chosen for its flexibility with dynamic data, such as custom fields per patient, and ease of authentication integration.
-   **React-Query and React-Table**: Used for efficient data handling, caching, and advanced table functionalities.

## Development Insights

### Scheduling Feature Implementation (Future Enhancement)

-   **Calendar Integration**: A calendar view populated with scheduled sessions, sortable and filterable by patient.
-   **Backend Design**: Creation of a collection within each user's document to store session data, including time, date, session length, patient reference, and address.

### Future Improvements

#### Enhanced City Filtering

-   **Current Approach**: Cities are currently treated as strings within a single field, which can lead to inconsistencies and limited filtering capabilities.
-   **Improvement Strategy**: Adopt geospatial data and normalized city naming conventions to enhance the accuracy and efficiency of city-based filtering.
-   **Impact**: This will significantly improve data sorting and analysis based on geographical locations, making the system more intuitive and robust for large datasets.

#### Dynamic Data Table

-   **Current Limitation**: The extra data option for custom fields is basic and static.
-   **Desired Feature**: Implementing a dynamic table where users can add, rearrange, and filter by custom data fields.
-   **Benefits**: This will greatly enhance the flexibility and usability of the dashboard, allowing for personalized and detailed patient data management.
