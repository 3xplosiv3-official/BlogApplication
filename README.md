# **BlogApplication**

### *A professional blog application for the test task at LZT forum.*


## 🚀 Features

**1. FastAPI Backend:** *High-performance, easy-to-use web framework.*

**2. React Frontend:** *Interactive UI with React and TypeScript.*

**3. Docker Deployment:** *Easy deployments with Docker.*

## 📦 Setup with Docker
![](https://1000logos.net/wp-content/uploads/2021/11/Docker-Logo-2013.png)

**1. Clone the repository.**

```
git clone https://github.com/3xplosiv3-official/BlogApplication.git
```

**2. Open the directory.**

```
cd BlogApplication
```

**1. Build and start docker containers.**

```
docker-compose up --build
```


## 🖥 Setup manualy

### Backend

**1. Open the backend directory and setup virtual environment.**

```
cd backend
python -m venv venv
```

**2. Activate the virtual enviroment and install all modules.**

```
source venv/bin/activate
pip install -r requirements.txt
```

**3. Run FastAPI application.**

```
python main.py
```

### Frontend

**1. Open the frontend directory and install modules.**

```
cd frontend
npm install
```

**2. Build up the project.**

```
npm run build
```

**3. Run the project.**

```
npm run preview
```


## ⚙️ Settings

* You can set-up your own settings in dot env files.
* Default username and password for admin are admin:admin1.
* The project uses SQLite as default database, you can change it in backend dot env file. Tortoise-ORM supports the most of popular databases, see more: https://tortoise.github.io/databases.html 
* You can read the docs for the app's REST API here: http://blog-app.docs.enigmalance.com/redoc
* Test the app: http://blog-app.enigmalance.com/

### Backend

```
PROJECT_NAME (str): Name of the project.
PROJECT_DESCRIPTION (str): Description of the project.
PROJECT_VERSION (str): Actual version of the project.
API_V1_ENDPOINT (str): Base endpoint for API.
DATABASE_URL (str): Connection URL for the database.
SECRET_KEY (str): Secret key for encoding and decoding JWT tokens.
ALGORITHM (str): Algorithm to be used for JWT.
ACCESS_TOKEN_EXPIRE_MINUTES (int): Token expiration time.
DEFAULT_ADMIN_USERNAME (str): Default admin username.
DEFAULT_ADMIN_PASSWORD (str): Default admin password.
SERVER_HOST (str): Host of the uvicorn server.
SERVER_PORT (int): Port of the uvicorn server.
```

### Frontend

```
VITE_BASE_URL (str): Base URL for query, for example "http://localhost:8000/api/v1"
```