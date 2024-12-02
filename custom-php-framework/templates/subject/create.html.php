<?php

/** @var \App\Service\Router $router */

$title = 'Dodaj przedmiot';
$bodyClass = 'edit';

ob_start(); ?>
    <h1>Dodaj przedmiot</h1>
    <form action="<?= $router->generatePath('subject-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="subject-create">
    </form>

    <a href="<?= $router->generatePath('subject-index') ?>">Powrót do listy</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
