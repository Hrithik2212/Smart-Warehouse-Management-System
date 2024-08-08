from sqlalchemy.orm import Session
from twilio.rest import Client

from dotenv import load_dotenv
import os
load_dotenv(dotenv_path="server/.env")

def send_alert_message(message: str, phone_number: str):
    account_sid = os.getenv("Account_SID")
    auth_token = os.getenv("AUTH_TOKEN")
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=message,
        from_=os.getenv("TWILIO_PHONE_NUMBER"),
        to=phone_number
    )    

    return message.sid



