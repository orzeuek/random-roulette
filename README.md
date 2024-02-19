# run at k8s
To run it locally at k8s, do:
```
sh ./deploy.sh
kubectl port-forward -n roulette service/roulette-backend 3000:3000 &
kubectl port-forward -n roulette service/roulette-frontend 3001:3001 &
```

# run locally ("dev mode"):
make sure docker is up and running. Those commands should run simultaneously, 
so run then in separate terminals or at background. 
```
cd database
sh ./run_db.sh
```

```
cd frontend 
BACKEND_URL=localhost:3000 npm run run-dev 
```

```
cd backend
DB_HOST=127.0.0.1 npm run run-dev  
```
