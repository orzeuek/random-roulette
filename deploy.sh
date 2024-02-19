## to build containers, put k8s elements in place

docker build -t roulette-frontend ./frontend
docker build -t roulette-backend ./backend

kubectl apply -f ./namespace.yaml
kubectl apply -n roulette -f ./k8s-deployment.yaml

kubectl -n roulette rollout restart deployment roulette-frontend
kubectl -n roulette rollout restart deployment roulette-backend

## unfortunately we have to execute those manually afterwards to make it work .....
#kubectl port-forward -n roulette service/roulette-frontend 3001:3001 &
#kubectl port-forward -n roulette service/roulette-backend 3000:3000 &
#kubectl port-forward -n roulette service/roulette-database 3306:3306 &