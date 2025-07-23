# Use a base image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Django project code
COPY . .
# Aloow port 8000
EXPOSE 8000

# Run Django server
CMD ["python","manage.py","runserver","0.0.0.0:8000"]