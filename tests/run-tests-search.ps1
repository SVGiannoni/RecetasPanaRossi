# Verification script for HU-02 / RF-01 Search Bar Rules

Write-Host "--- Corriendo Pruebas de Busqueda por Palabra Clave e Ingredientes ---"

$global:testCount = 0
$global:passed = 0
$global:failed = 0

$recipes = @(
    @{ title = "Medialunas de Manteca"; category = "Reposteria"; ingredients = @("harina", "manteca", "leche") },
    @{ title = "Risotto de Hongos"; category = "Salado"; ingredients = @("arroz carnaroli", "hongos portobello", "queso parmesano") },
    @{ title = "Tarta Tatin de Manzana"; category = "Dulce"; ingredients = @("manzanas verdes", "harina 0000", "azucar") }
)

function Search-Recipes($items, $query) {
    if (-not $query -or $query.Trim().Length -eq 0) {
        return @($items)
    }
    $q = $query.Trim().ToLower()
    $result = [System.Collections.ArrayList]::new()
    foreach ($r in $items) {
        $titleMatch = $r.title.ToLower().Contains($q)
        $ingMatch = $false
        foreach ($ing in $r.ingredients) {
            if ($ing.ToLower().Contains($q)) {
                $ingMatch = $true
                break
            }
        }
        if ($titleMatch -or $ingMatch) {
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

# Test 1: Búsqueda por título ("Medialunas")
$r1 = @(Search-Recipes $recipes "Medialunas")
Assert-Test "Busqueda por coincidencia en titulo" ($r1.Count -eq 1 -and $r1[0].title -eq "Medialunas de Manteca")

# Test 2: Búsqueda por ingrediente ("harina")
$r2 = @(Search-Recipes $recipes "harina")
Assert-Test "Busqueda por ingrediente presente en multiples recetas" ($r2.Count -eq 2)

# Test 3: Consulta vacía o espacios
$r3 = @(Search-Recipes $recipes "   ")
Assert-Test "Consulta vacia retorna todas las recetas" ($r3.Count -eq 3)

# Test 4: Consulta sin coincidencias ("Pescado")
$r4 = @(Search-Recipes $recipes "Pescado")
Assert-Test "Consulta sin coincidencias retorna lista vacia" ($r4.Count -eq 0)

Write-Host "--- Resumen de Pruebas Busqueda ---"
Write-Host "Pruebas pasadas: $global:passed / $global:testCount"
if ($global:failed -gt 0) {
    Exit 1
}
