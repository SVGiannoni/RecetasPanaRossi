# Verification script for HU-03 / RF-01 Favorites Toggle Rules

Write-Host "--- Corriendo Pruebas de Accion para Marcar/Desmarcar Favoritas ---"

$global:testCount = 0
$global:passed = 0
$global:failed = 0

# Mock favorite store
$script:favSet = [System.Collections.Generic.HashSet[string]]::new()

function Toggle-Favorite($recipeId) {
    if (-not $recipeId) { return $false }
    if ($script:favSet.Contains($recipeId)) {
        [void]$script:favSet.Remove($recipeId)
    } else {
        [void]$script:favSet.Add($recipeId)
    }
    return $script:favSet.Contains($recipeId)
}

function Is-Favorite($recipeId) {
    return $script:favSet.Contains($recipeId)
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

# Test 1: Estado inicial no es favorita
$isFav0 = Is-Favorite "REC-001"
Assert-Test "Receta no es favorita inicialmente" ($isFav0 -eq $false)

# Test 2: Marcar como favorita
$isFav1 = Toggle-Favorite "REC-001"
Assert-Test "Marcar receta como favorita retorna verdadero" ($isFav1 -eq $true -and (Is-Favorite "REC-001") -eq $true)

# Test 3: Desmarcar como favorita
$isFav2 = Toggle-Favorite "REC-001"
Assert-Test "Desmarcar receta favorita retorna falso" ($isFav2 -eq $false -and (Is-Favorite "REC-001") -eq $false)

# Test 4: Múltiples favoritas en simultáneo
[void](Toggle-Favorite "REC-001")
[void](Toggle-Favorite "REC-002")
Assert-Test "Mantener multiples favoritas en simultaneo" ($script:favSet.Count -eq 2)

Write-Host "--- Resumen de Pruebas Favoritas ---"
Write-Host "Pruebas pasadas: $global:passed / $global:testCount"
if ($global:failed -gt 0) {
    Exit 1
}
