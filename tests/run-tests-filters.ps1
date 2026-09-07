# Verification script for HU-02 / RF-02 Category Filter and Empty State Rules

Write-Host "--- Corriendo Pruebas de Filtros por Categoria y Estado Vacio ---"

$global:testCount = 0
$global:passed = 0
$global:failed = 0

$recipes = @(
    @{ title = "Medialunas de Manteca"; category = "Reposteria"; ingredients = @("harina", "manteca") },
    @{ title = "Risotto de Hongos"; category = "Salado"; ingredients = @("arroz", "hongos") },
    @{ title = "Tarta Tatin de Manzana"; category = "Dulce"; ingredients = @("manzanas", "azucar") },
    @{ title = "Ensalada de Quinoa"; category = "Vegano"; ingredients = @("quinoa", "palta") }
)

function Filter-Recipes($items, $search, $category) {
    $q = if ($search) { $search.Trim().ToLower() } else { "" }
    $cat = if ($category) { $category.Trim() } else { "" }

    $result = [System.Collections.ArrayList]::new()
    foreach ($r in $items) {
        # Filtro categoría
        if ($cat -and $cat -ne "Todas") {
            if ($r.category -ne $cat) { continue }
        }

        # Filtro búsqueda
        if ($q.Length -gt 0) {
            $tMatch = $r.title.ToLower().Contains($q)
            $iMatch = $false
            foreach ($ing in $r.ingredients) {
                if ($ing.ToLower().Contains($q)) { $iMatch = $true; break }
            }
            if (-not $tMatch -and -not $iMatch) { continue }
        }

        [void]$result.Add($r)
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

# Test 1: Filtrar por categoría "Dulce"
$f1 = @(Filter-Recipes $recipes "" "Dulce")
Assert-Test "Filtrado por categoria Dulce" ($f1.Count -eq 1 -and $f1[0].title -eq "Tarta Tatin de Manzana")

# Test 2: Filtrar por categoría "Vegano"
$f2 = @(Filter-Recipes $recipes "" "Vegano")
Assert-Test "Filtrado por categoria Vegano" ($f2.Count -eq 1 -and $f2[0].title -eq "Ensalada de Quinoa")

# Test 3: Categoría "Todas" devuelve todo
$f3 = @(Filter-Recipes $recipes "" "Todas")
Assert-Test "Categoria Todas devuelve todas las recetas" ($f3.Count -eq 4)

# Test 4: Combinación Búsqueda ("harina") + Categoría ("Reposteria")
$f4 = @(Filter-Recipes $recipes "harina" "Reposteria")
Assert-Test "Combinacion de busqueda por ingrediente y categoria" ($f4.Count -eq 1 -and $f4[0].title -eq "Medialunas de Manteca")

# Test 5: Sin coincidencias devuelve 0 (dispara mensaje de sugerencias)
$f5 = @(Filter-Recipes $recipes "Hamburguesa" "Vegano")
Assert-Test "Sin coincidencias retorna 0 elementos" ($f5.Count -eq 0)

Write-Host "--- Resumen de Pruebas Filtros ---"
Write-Host "Pruebas pasadas: $global:passed / $global:testCount"
if ($global:failed -gt 0) {
    Exit 1
}
