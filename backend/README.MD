## Using Dockerfile

### Create requirements.txt

```
pip freeze > requirements.txt
```

### Using Docker CLI

```
docker build -t django-app .
```

### Docker compose

```
docker-compose up --build
```

### Run migrations inside your Docker container

```
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```

### Restart containers

```
docker-compose down -v
docker-compose up -d --build
```
