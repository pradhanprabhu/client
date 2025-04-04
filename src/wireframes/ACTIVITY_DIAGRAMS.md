# Activity Diagrams for Hotel Management System

## 1. User Management Activities
```plantuml
@startuml
start

:User accesses system;
if (New user?) then (yes)
    :Enter registration details;
    if (Email valid?) then (yes)
        if (Email exists?) then (no)
            :Create new account;
            :Save user details;
            :Send confirmation email;
            :Show success message;
        else (yes)
            :Show email exists error;
        endif
    else (no)
        :Show validation error;
    endif
else (no)
    :Enter login credentials;
    if (Credentials valid?) then (yes)
        :Authenticate user;
        :Show dashboard;
    else (no)
        :Show login error;
    endif
endif

:User accesses profile;
if (Update profile?) then (yes)
    :Enter new details;
    if (Details valid?) then (yes)
        :Save changes;
        :Show success message;
    else (no)
        :Show validation error;
    endif
else if (Change password?) then (yes)
    :Enter current password;
    if (Password correct?) then (yes)
        :Enter new password;
        if (New password valid?) then (yes)
            :Update password;
            :Show success message;
        else (no)
            :Show password error;
        endif
    else (no)
        :Show current password error;
    endif
endif

stop
@enduml
```

## 2. Room Management Activities
```plantuml
@startuml
start

:User searches for rooms;
if (Rooms available?) then (yes)
    :Display room list;
    :Apply filters;
    if (View room details?) then (yes)
        :Show room information;
        :Display facilities;
        :Show pricing;
        :Display images;
    endif
else (no)
    :Show no rooms message;
endif

:Admin accesses room management;
if (Admin authenticated?) then (yes)
    :Show management options;
    if (Add new room?) then (yes)
        :Enter room details;
        :Upload room images;
        if (Details valid?) then (yes)
            :Save room information;
            :Show success message;
        else (no)
            :Show validation error;
        endif
    else if (Update room?) then (yes)
        :Select room to update;
        :Modify room details;
        if (Details valid?) then (yes)
            :Update room information;
            :Show success message;
        else (no)
            :Show validation error;
        endif
    else if (Delete room?) then (yes)
        if (Room has bookings?) then (no)
            :Confirm deletion;
            :Delete room;
            :Show success message;
        else (yes)
            :Show deletion error;
        endif
    endif
else (no)
    :Show authentication error;
endif

stop
@enduml
```

## 3. Booking Management Activities
```plantuml
@startuml
start

:User selects room;
if (Room available?) then (yes)
    :Select dates;
    if (Dates valid?) then (yes)
        :Calculate total price;
        :Show booking summary;
        if (User confirms?) then (yes)
            :Process payment;
            if (Payment successful?) then (yes)
                :Create booking;
                :Send confirmation email;
                :Show success message;
            else (no)
                :Show payment error;
            endif
        else (no)
            :Cancel booking process;
        endif
    else (no)
        :Show date validation error;
    endif
else (no)
    :Show availability error;
endif

:User views bookings;
if (Cancel booking?) then (yes)
    if (Cancellation allowed?) then (yes)
        :Confirm cancellation;
        :Process refund;
        :Send cancellation email;
        :Show success message;
    else (no)
        :Show cancellation error;
    endif
endif

:Admin manages bookings;
if (Admin authenticated?) then (yes)
    :View all bookings;
    if (Update booking?) then (yes)
        :Select booking;
        :Modify booking details;
        if (Changes valid?) then (yes)
            :Update booking;
            :Notify user;
            :Show success message;
        else (no)
            :Show validation error;
        endif
    endif
else (no)
    :Show authentication error;
endif

stop
@enduml
```

## 4. Admin Dashboard Activities
```plantuml
@startuml
start

:Admin accesses dashboard;
if (Admin authenticated?) then (yes)
    :Load dashboard data;
    :Display overview statistics;
    
    if (Generate reports?) then (yes)
        :Select report type;
        if (Type valid?) then (yes)
            :Select date range;
            if (Range valid?) then (yes)
                :Generate report;
                if (Data available?) then (yes)
                    :Process data;
                    :Format report;
                    :Display report;
                    if (Export needed?) then (yes)
                        :Export to file;
                        :Download report;
                    endif
                else (no)
                    :Show no data message;
                endif
            else (no)
                :Show range error;
            endif
        else (no)
            :Show type error;
        endif
    endif
    
    if (Manage system?) then (yes)
        :Show system options;
        if (Update settings?) then (yes)
            :Modify settings;
            if (Settings valid?) then (yes)
                :Save changes;
                :Show success message;
            else (no)
                :Show validation error;
            endif
        endif
    endif
else (no)
    :Show authentication error;
endif

stop
@enduml
```

## 5. Content Management Activities
```plantuml
@startuml
start

:Admin accesses content management;
if (Admin authenticated?) then (yes)
    :Show content options;
    
    if (Manage blog?) then (yes)
        if (Create post?) then (yes)
            :Enter post content;
            :Upload images;
            if (Content valid?) then (yes)
                :Save post;
                :Show success message;
            else (no)
                :Show validation error;
            endif
        else if (Edit post?) then (yes)
            :Select post to edit;
            :Update content;
            if (Content valid?) then (yes)
                :Save changes;
                :Show success message;
            else (no)
                :Show validation error;
            endif
        else if (Delete post?) then (yes)
            :Confirm deletion;
            :Delete post;
            :Show success message;
        endif
    endif
    
    if (Manage FAQs?) then (yes)
        if (Add FAQ?) then (yes)
            :Enter question and answer;
            if (Content valid?) then (yes)
                :Save FAQ;
                :Show success message;
            else (no)
                :Show validation error;
            endif
        else if (Update FAQ?) then (yes)
            :Select FAQ to edit;
            :Update content;
            if (Content valid?) then (yes)
                :Save changes;
                :Show success message;
            else (no)
                :Show validation error;
            endif
        endif
    endif
else (no)
    :Show authentication error;
endif

stop
@enduml
```

## 6. Places/Attractions Activities
```plantuml
@startuml
start

:User views places;
:Load places list;
if (Places exist?) then (yes)
    :Display places;
    if (View details?) then (yes)
        :Show place information;
        :Display gallery;
        :Show location;
        :Display description;
    endif
else (no)
    :Show no places message;
endif

:Admin manages places;
if (Admin authenticated?) then (yes)
    :Show management options;
    
    if (Add new place?) then (yes)
        :Enter place details;
        :Upload images;
        if (Details valid?) then (yes)
            :Save place;
            :Show success message;
        else (no)
            :Show validation error;
        endif
    else if (Update place?) then (yes)
        :Select place to update;
        :Modify details;
        if (Details valid?) then (yes)
            :Update place;
            :Show success message;
        else (no)
            :Show validation error;
        endif
    else if (Delete place?) then (yes)
        :Confirm deletion;
        :Delete place;
        :Show success message;
    endif
    
    if (Manage categories?) then (yes)
        if (Add category?) then (yes)
            :Enter category details;
            if (Details valid?) then (yes)
                :Save category;
                :Show success message;
            else (no)
                :Show validation error;
            endif
        endif
    endif
else (no)
    :Show authentication error;
endif

stop
@enduml
```

## 7. Contact/Communication Activities
```plantuml
@startuml
start

:User fills contact form;
if (Form data valid?) then (yes)
    :Save message;
    :Send notification email;
    :Show success message;
else (no)
    :Show validation error;
endif

:Admin manages messages;
if (Admin authenticated?) then (yes)
    :Load messages;
    if (Messages exist?) then (yes)
        :Display messages;
        if (Reply needed?) then (yes)
            :Compose reply;
            :Send reply;
            :Show success message;
        endif
    else (no)
        :Show no messages;
    endif
else (no)
    :Show authentication error;
endif

:Admin manages contact info;
if (Admin authenticated?) then (yes)
    :Show contact options;
    if (Update info?) then (yes)
        :Modify contact details;
        if (Details valid?) then (yes)
            :Save changes;
            :Show success message;
        else (no)
            :Show validation error;
        endif
    endif
endif

stop
@enduml
```

## 8. Reporting Activities
```plantuml
@startuml
start

:Admin accesses reporting;
if (Admin authenticated?) then (yes)
    :Show report options;
    
    if (Generate booking report?) then (yes)
        :Select date range;
        if (Range valid?) then (yes)
            :Fetch booking data;
            :Process data;
            :Generate report;
            :Display report;
            if (Export needed?) then (yes)
                :Export to file;
                :Download report;
            endif
        else (no)
            :Show range error;
        endif
    endif
    
    if (Generate revenue report?) then (yes)
        :Select date range;
        if (Range valid?) then (yes)
            :Fetch revenue data;
            :Process data;
            :Generate report;
            :Display report;
            if (Export needed?) then (yes)
                :Export to file;
                :Download report;
            endif
        else (no)
            :Show range error;
        endif
    endif
    
    if (Generate occupancy report?) then (yes)
        :Select date range;
        if (Range valid?) then (yes)
            :Fetch occupancy data;
            :Process data;
            :Generate report;
            :Display report;
            if (Export needed?) then (yes)
                :Export to file;
                :Download report;
            endif
        else (no)
            :Show range error;
        endif
    endif
else (no)
    :Show authentication error;
endif

stop
@enduml
``` 