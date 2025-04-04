# Sequence Diagrams for Hotel Management System

## 1. User Registration Process
```plantuml
@startuml
actor User
participant "Frontend" as FE
participant "Auth Service" as Auth
participant "Database" as DB
participant "Email Service" as Email

User -> FE: Enter registration details
FE -> Auth: Validate input
Auth -> DB: Check if email exists
DB --> Auth: Email not found
Auth -> DB: Create new user
DB --> Auth: User created
Auth -> Email: Send confirmation email
Email --> Auth: Email sent
Auth --> FE: Registration successful
FE --> User: Show success message
@enduml
```

## 2. Room Booking Process
```plantuml
@startuml
actor User
participant "Frontend" as FE
participant "Room Service" as Room
participant "Booking Service" as Booking
participant "Payment Service" as Payment
participant "Database" as DB

User -> FE: Search for rooms
FE -> Room: Get available rooms
Room -> DB: Query rooms
DB --> Room: Return rooms
Room --> FE: Display rooms

User -> FE: Select room & dates
FE -> Room: Check availability
Room -> DB: Verify availability
DB --> Room: Room available
Room --> FE: Show availability

User -> FE: Confirm booking
FE -> Booking: Create booking
Booking -> DB: Save booking
DB --> Booking: Booking saved
Booking -> Payment: Process payment
Payment --> Booking: Payment successful
Booking --> FE: Booking confirmed
FE --> User: Show confirmation
@enduml
```

## 3. Admin Room Management Process
```plantuml
@startuml
actor Admin
participant "Frontend" as FE
participant "Auth Service" as Auth
participant "Room Service" as Room
participant "Database" as DB

Admin -> FE: Access room management
FE -> Auth: Verify admin access
Auth --> FE: Access granted

Admin -> FE: Add new room
FE -> Room: Create room
Room -> DB: Save room details
DB --> Room: Room saved
Room --> FE: Room created
FE --> Admin: Show success message

Admin -> FE: Update room
FE -> Room: Update room details
Room -> DB: Update room
DB --> Room: Room updated
Room --> FE: Update successful
FE --> Admin: Show success message
@enduml
```

## 4. Content Management Process
```plantuml
@startuml
actor Admin
participant "Frontend" as FE
participant "Auth Service" as Auth
participant "Content Service" as Content
participant "File Storage" as Storage
participant "Database" as DB

Admin -> FE: Access content management
FE -> Auth: Verify admin access
Auth --> FE: Access granted

Admin -> FE: Create new post
FE -> Content: Create post content
Content -> Storage: Upload images
Storage --> Content: Images uploaded
Content -> DB: Save post
DB --> Content: Post saved
Content --> FE: Post created
FE --> Admin: Show success message

Admin -> FE: Edit post
FE -> Content: Update post content
Content -> DB: Update post
DB --> Content: Post updated
Content --> FE: Update successful
FE --> Admin: Show success message
@enduml
```

## 5. Report Generation Process
```plantuml
@startuml
actor Admin
participant "Frontend" as FE
participant "Auth Service" as Auth
participant "Report Service" as Report
participant "Database" as DB
participant "Export Service" as Export

Admin -> FE: Request report
FE -> Auth: Verify admin access
Auth --> FE: Access granted

Admin -> FE: Select report type
FE -> Report: Generate report
Report -> DB: Fetch data
DB --> Report: Return data
Report -> Report: Process data
Report -> Export: Format report
Export --> Report: Report formatted
Report --> FE: Report ready
FE --> Admin: Display report

Admin -> FE: Export report
FE -> Export: Export to file
Export --> FE: File generated
FE --> Admin: Download report
@enduml
```

## 6. User Profile Update Process
```plantuml
@startuml
actor User
participant "Frontend" as FE
participant "Auth Service" as Auth
participant "Profile Service" as Profile
participant "Database" as DB

User -> FE: Access profile
FE -> Auth: Verify user session
Auth --> FE: Session valid

User -> FE: Update profile details
FE -> Profile: Validate changes
Profile -> DB: Update user data
DB --> Profile: Data updated
Profile --> FE: Update successful
FE --> User: Show success message

User -> FE: Change password
FE -> Auth: Validate current password
Auth --> FE: Password valid
Auth -> DB: Update password
DB --> Auth: Password updated
Auth --> FE: Password changed
FE --> User: Show success message
@enduml
```

## 7. Contact Form Process
```plantuml
@startuml
actor User
participant "Frontend" as FE
participant "Contact Service" as Contact
participant "Email Service" as Email
participant "Database" as DB

User -> FE: Fill contact form
FE -> Contact: Validate form data
Contact -> DB: Save message
DB --> Contact: Message saved
Contact -> Email: Send notification
Email --> Contact: Email sent
Contact --> FE: Message sent
FE --> User: Show confirmation

actor Admin
Admin -> FE: View messages
FE -> Contact: Get messages
Contact -> DB: Fetch messages
DB --> Contact: Return messages
Contact --> FE: Display messages
FE --> Admin: Show message list
@enduml
```

## 8. Places/Attractions Management Process
```plantuml
@startuml
actor Admin
participant "Frontend" as FE
participant "Auth Service" as Auth
participant "Places Service" as Places
participant "File Storage" as Storage
participant "Database" as DB

Admin -> FE: Access places management
FE -> Auth: Verify admin access
Auth --> FE: Access granted

Admin -> FE: Add new place
FE -> Places: Create place
Places -> Storage: Upload images
Storage --> Places: Images uploaded
Places -> DB: Save place
DB --> Places: Place saved
Places --> FE: Place created
FE --> Admin: Show success message

actor User
User -> FE: View places
FE -> Places: Get places list
Places -> DB: Fetch places
DB --> Places: Return places
Places --> FE: Display places
FE --> User: Show places list
@enduml
``` 