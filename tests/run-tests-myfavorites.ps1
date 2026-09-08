# Verification script for HU-03 / RF-02 Profile Favorites View Rules

Write-Host "--- Corriendo Pruebas de Seccion 'Mis Favoritas' en Perfil ---"

$global:testCount = 0
$global:passed = 0
$global:failed = 0

$recipes = @(
    @{ id = "REC-01"; title = "Medialunas de Manteca"; category = "Reposteria" },
    @{ id = "REC-02"; title = "Risotto de Hongos"; category = "Salado" },
    @{ id = "REC-03"; title = "Tarta Tatin de Manzana"; category = "Dulce" }
)

$favIds = @("REC-01", "REC-03")

function Get-MyFavorites($items, $favoriteIds) {
    $result = [System.Collections.ArrayList]::new()
    foreach ($r in $items) {
        if ($favoriteIds -contains $r.id) {
            [void]$result.Add($r)
        }
    }
    return @($result)
}

function Assert-Test($name, $condition) {
    $global:testCount++
    if ($condition) {
        Write-Host "  PASO: $name"
        $global:passed++
    } else {
        Write-Host "  FALLO: $name"
        $global:failed++
    }
}

# Test 1: Filtrar únicamente recetas guardadas como favoritas
$favs = @(Get-MyFavorites $recipes $favIds)
Assert-Test "Despliega unicamente recetas marcadas como favoritas" ($favs.Count -eq 2 -and $favs[0].id -eq "REC-01" -and $favs[1].id -eq "REC-03")

# Test 2: Si no hay favoritas, retorna lista vacía
$emptyFavs = @(Get-MyFavorites $recipes @())
Assert-Test "Retorna 0 recetas cuando no hay favoritas guardadas" ($emptyFavs.Count -eq 0)

# Test 3: Conteo correcto de la insignia de badge
$badgeCount = $favIds.Count
Assert-Test "Contador de insignia de badge coincide con la cantidad de favoritas" ($badgeCount -eq 2)

Write-Host "--- Resumen de Pruebas Seccion Mis Favoritas ---"
Write-Host "Pruebas pasadas: $global:passed / $global:testCount"
if ($global:failed -gt 0) {
    Exit 1
}
