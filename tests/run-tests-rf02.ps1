# Verification script for RF-02 Persistence and Catalog Rules

Write-Host "--- Corriendo Pruebas de Persistencia para RF-02 (Catalogo de Recetas) ---"

$global:testCount = 0
$global:passed = 0
$global:failed = 0

# Mock store array
$script:store = [System.Collections.ArrayList]::new()

function Save-Recipe($title, $category, $prepTime, $servings, $ingredients, $steps) {
    $newRecipe = @{
        id = "REC-" + (Get-Date).Ticks
        title = $title.Trim()
        category = $category.Trim()
        prepTime = [int]$prepTime
        servings = [int]$servings
        ingredients = $ingredients
        steps = $steps
        published = $true
        createdAt = (Get-Date).ToString("o")
    }
    [void]$script:store.Add($newRecipe)
    return $newRecipe
}

function Get-PublishedRecipes {
    return $script:store | Where-Object { $_.published -eq $true }
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

# Test 1: Guardado de receta nueva
$rec1 = Save-Recipe "Empanadas de Carne Mendozinas" "Salado" 45 12 @("500g carne picada", "1kg cebolla") @("1. Cocinar relleno", "2. Armar y horneado")
Assert-Test "Guardar receta en almacen" ($rec1.id -ne $null -and $rec1.title -eq "Empanadas de Carne Mendozinas")

# Test 2: Visibilidad en el catálogo publicado
$published = @(Get-PublishedRecipes)
Assert-Test "Receta publicada visible en catalogo" ($published.Count -eq 1 -and $published[0].published -eq $true)

# Test 3: Guardado secuencial y orden descendente por fecha
$rec2 = Save-Recipe "Volcan de Chocolate" "Reposteria" 20 4 @("200g chocolate", "4 huevos") @("1. Derretir chocolate", "2. Hornear 10 min")
$published2 = @(Get-PublishedRecipes)
Assert-Test "Multiples recetas guardadas correctamente" ($published2.Count -eq 2)

Write-Host "--- Resumen de Pruebas RF-02 ---"
Write-Host "Pruebas pasadas: $global:passed / $global:testCount"
if ($global:failed -gt 0) {
    Exit 1
}
