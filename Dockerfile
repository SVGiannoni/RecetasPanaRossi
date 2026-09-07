# Imagen base ligera
FROM python:3.11-slim

# Evita que python escriba archivos .pyc y fuerza salida sin buffer
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo
WORKDIR /app

# Dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar manifiesto de dependencias si existe
COPY requirements.txt* ./

# Instalar dependencias en caso de existir
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

# Copiar el código fuente
COPY . .

# Puerto expuesto
EXPOSE 8000

# Comando por defecto
CMD ["python", "-m", "http.server", "8000"]
