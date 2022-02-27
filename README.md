# Athenaeum
A digital books library written with SvelteKit and Express.

## Run the project using docker-compose
This repository includes three examples options for running using docker-compose.

<details>
  <summary>1. Run apps in <strong>local development mode</strong>, on separate ports, without building anything.</summary>
  
  ```sh
    docker-compose -f docker-compose.dev.yml up
  ```
  
</details>

<details>
  <summary>2. Build and run apps in <strong>live/production mode</strong> on separate ports.</summary>
  
  ```sh
    docker-compose up -d
  ```
  
</details>


<details>
  <summary>3. Build and run apps in <strong>static/production mode</strong> under a single origin, using nginx as a reverse proxy.</summary>
  
  ```sh
    docker-compose -f docker-compose.prod.yml up -d
  ```
  
</details>
