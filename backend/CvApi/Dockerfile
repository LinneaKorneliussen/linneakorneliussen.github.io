# 1️⃣ Build stage: använder .NET SDK för att bygga appen
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Kopiera projektfil(er) och restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Kopiera resten av koden och publicera release build
COPY . ./
RUN dotnet publish -c Release -o out

# 2️⃣ Runtime stage: lättviktsimage för att köra appen
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Kopiera utbyggd app från build-stage
COPY --from=build /app/out ./

# Exponera porten som backend använder
EXPOSE 80

# Starta backend
ENTRYPOINT ["dotnet", "CvApi.dll"]
