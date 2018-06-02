
#!/bin/sh

for %%F in ("%filename%") do set dirname=%%~dpF

# wget output file
FILE=bookings.ics
# wget log file
LOGFILE=wget.log

# wget download url
URL=http://www.airbnb.de/calendar/ical/6713316.ics?s=1c409705409c6f5b9de6118abe$

cd %dirname%
wget $URL -O $FILE -o $LOGFILE

echo "script executed"

