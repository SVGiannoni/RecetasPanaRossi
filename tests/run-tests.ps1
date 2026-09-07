# Verification script for RF-01 Form Validation Rules

Write-Host "--- Corriendo Pruebas de Validacion para RF-01 (Formulario de Recetas) ---"

$global:testCount = 0
$global:passed = 0
$global:failed = 0

function Assert-Validation($name, $data, $expectedValid) {
    $global:testCount++
    $isValid = $true

    if (-not $data.title -or $data.title.Trim().Length -lt 3) {
        $isValid = $false
    }
    if (-not $data.category -or $data.category.Trim().Length -eq 0) {
        $isValid = $false
    }
    $prepTime = 0
    if (-not [int]::TryParse($data.prepTime, [ref]$prepTime) -or $prepTime -le 0) {
        $isValid = $false
    }
    $servings = 0
    if (-not [int]::TryParse($data.servings, [ref]$servings) -or $servings -le 0) {
        $isValid = $false
    }
    $ing = ($data.ingredients -split "`n").Trim() | Where-Object { $_.Length -gt 0 }
    if ($ing.Count -eq 0) {
        $isValid = $false
    }
    $steps = ($data.steps -split "`n").Trim() | Where-Object { $_.Length -gt 0 }
    if ($steps.Count -eq 0) {
        $isValid = $false
    }

    if ($isValid -eq $expectedValid) {
        Write-Host "  PASO: $name"
        $global:passed++
    } else {
        Write-Host "  FALLO: $name"
        $global:failed++
    }
}

Assert-Validation "Caso Valido Completo" @{
    title = "Tarta Tatin de Manzana"
    category = "Reposteria"
    prepTime = "60"
    servings = "8"
    ingredients = "200g harina`n100g manteca"
    steps = "Paso 1`nPaso 2"
} $true

Assert-Validation "Falla por Titulo Corto" @{
    title = "Ab"
    category = "Reposteria"
    prepTime = "60"
    servings = "8"
    ingredients = "Ingrediente"
    steps = "Paso 1"
} $false

Assert-Validation "Falla por Categoria Vacia" @{
    title = "Titulo Valido"
    category = ""
    prepTime = "60"
    servings = "8"
    ingredients = "Ingrediente"
    steps = "Paso 1"
} $false

Assert-Validation "Falla por Tiempo Invalido" @{
    title = "Titulo Valido"
    category = "Dulce"
    prepTime = "0"
    servings = "8"
    ingredients = "Ingrediente"
    steps = "Paso 1"
} $false

Assert-Validation "Falla por Ingredientes Vacios" @{
    title = "Titulo Valido"
    category = "Dulce"
    prepTime = "30"
    servings = "4"
    ingredients = "   "
    steps = "Paso 1"
} $false

Write-Host "--- Resumen de Pruebas ---"
Write-Host "Pruebas pasadas: $global:passed / $global:testCount"
if ($global:failed -gt 0) {
    Exit 1
}
