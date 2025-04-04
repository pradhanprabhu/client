# Use Case Diagrams for Hotel Management System

## 1. User Management Subsystem
```plantuml
@startuml
left to right direction

actor User
actor Admin

rectangle "User Management System" {
    usecase "Register" as UC1
    usecase "Login" as UC2
    usecase "Update Profile" as UC3
    usecase "View Profile" as UC4
    usecase "Change Password" as UC5
    usecase "Manage Users" as UC6
    usecase "View User List" as UC7
    usecase "Delete User" as UC8
}

User --> UC1
User --> UC2
User --> UC3
User --> UC4
User --> UC5
Admin --> UC6
Admin --> UC7
Admin --> UC8

UC6 ..> UC7 : <<include>>
UC6 ..> UC8 : <<include>>

@enduml
```

## 2. Room Management Subsystem
```plantuml
@startuml
left to right direction

actor Guest
actor User
actor Admin

rectangle "Room Management System" {
    usecase "View Rooms" as UC1
    usecase "Search Rooms" as UC2
    usecase "View Room Details" as UC3
    usecase "Add Room" as UC4
    usecase "Update Room" as UC5
    usecase "Delete Room" as UC6
    usecase "Check Availability" as UC7
    usecase "Manage Room Types" as UC8
}

Guest --> UC1
Guest --> UC2
Guest --> UC3
User --> UC1
User --> UC2
User --> UC3
User --> UC7
Admin --> UC4
Admin --> UC5
Admin --> UC6
Admin --> UC8

UC2 ..> UC1 : <<include>>
UC3 ..> UC1 : <<include>>

@enduml
```

## 3. Booking Management Subsystem
```plantuml
@startuml
left to right direction

actor User
actor Admin
actor "Payment System" as Payment

rectangle "Booking Management System" {
    usecase "Create Booking" as UC1
    usecase "View Bookings" as UC2
    usecase "Cancel Booking" as UC3
    usecase "Update Booking" as UC4
    usecase "Process Payment" as UC5
    usecase "Generate Invoice" as UC6
    usecase "View Booking History" as UC7
    usecase "Manage Bookings" as UC8
}

User --> UC1
User --> UC2
User --> UC3
User --> UC7
Admin --> UC4
Admin --> UC8
UC1 --> UC5
UC5 --> Payment
UC5 --> UC6

UC1 ..> UC2 : <<include>>
UC8 ..> UC4 : <<include>>

@enduml
```

## 4. Admin Dashboard Subsystem
```plantuml
@startuml
left to right direction

actor Admin

rectangle "Admin Dashboard System" {
    usecase "View Dashboard" as UC1
    usecase "Generate Reports" as UC2
    usecase "Manage Content" as UC3
    usecase "System Settings" as UC4
    usecase "View Analytics" as UC5
    usecase "Export Data" as UC6
    usecase "Manage Permissions" as UC7
    usecase "View Logs" as UC8
}

Admin --> UC1
Admin --> UC2
Admin --> UC3
Admin --> UC4
Admin --> UC5
Admin --> UC6
Admin --> UC7
Admin --> UC8

UC1 ..> UC5 : <<include>>
UC2 ..> UC6 : <<include>>

@enduml
```

## 5. Content Management Subsystem
```plantuml
@startuml
left to right direction

actor Admin

rectangle "Content Management System" {
    usecase "Manage Blog Posts" as UC1
    usecase "Manage FAQs" as UC2
    usecase "Manage Images" as UC3
    usecase "Manage Hotel Info" as UC4
    usecase "Create Post" as UC5
    usecase "Edit Post" as UC6
    usecase "Delete Post" as UC7
    usecase "Upload Images" as UC8
}

Admin --> UC1
Admin --> UC2
Admin --> UC3
Admin --> UC4
UC1 ..> UC5 : <<include>>
UC1 ..> UC6 : <<include>>
UC1 ..> UC7 : <<include>>
UC3 ..> UC8 : <<include>>

@enduml
```

## 6. Places/Attractions Subsystem
```plantuml
@startuml
left to right direction

actor Guest
actor User
actor Admin

rectangle "Places Management System" {
    usecase "View Places" as UC1
    usecase "Search Places" as UC2
    usecase "View Place Details" as UC3
    usecase "Add Place" as UC4
    usecase "Update Place" as UC5
    usecase "Delete Place" as UC6
    usecase "Manage Categories" as UC7
    usecase "View Gallery" as UC8
}

Guest --> UC1
Guest --> UC2
Guest --> UC3
Guest --> UC8
User --> UC1
User --> UC2
User --> UC3
User --> UC8
Admin --> UC4
Admin --> UC5
Admin --> UC6
Admin --> UC7

UC2 ..> UC1 : <<include>>
UC3 ..> UC1 : <<include>>

@enduml
```

## 7. Contact/Communication Subsystem
```plantuml
@startuml
left to right direction

actor User
actor Admin

rectangle "Contact Management System" {
    usecase "Send Message" as UC1
    usecase "View Messages" as UC2
    usecase "Reply Message" as UC3
    usecase "Delete Message" as UC4
    usecase "View Contact Info" as UC5
    usecase "Update Contact Info" as UC6
    usecase "Manage FAQ" as UC7
    usecase "View Message History" as UC8
}

User --> UC1
User --> UC5
Admin --> UC2
Admin --> UC3
Admin --> UC4
Admin --> UC6
Admin --> UC7
Admin --> UC8

UC2 ..> UC8 : <<include>>
UC3 ..> UC2 : <<include>>

@enduml
```

## 8. Reporting Subsystem
```plantuml
@startuml
left to right direction

actor Admin

rectangle "Reporting System" {
    usecase "Generate Booking Report" as UC1
    usecase "Generate Revenue Report" as UC2
    usecase "Generate Occupancy Report" as UC3
    usecase "Export Report" as UC4
    usecase "View Analytics" as UC5
    usecase "Schedule Reports" as UC6
    usecase "Customize Report" as UC7
    usecase "View Report History" as UC8
}

Admin --> UC1
Admin --> UC2
Admin --> UC3
Admin --> UC4
Admin --> UC5
Admin --> UC6
Admin --> UC7
Admin --> UC8

UC1 ..> UC4 : <<include>>
UC2 ..> UC4 : <<include>>
UC3 ..> UC4 : <<include>>

@enduml
``` 