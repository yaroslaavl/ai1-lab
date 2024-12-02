<?php

/** @var \App\Model\Subject $subject */
/** @var \App\Service\Router $router */

$title = "Edytuj przedmiot {$subject->getName()} ({$subject->getId()})";
$bodyClass = 'edit';

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('subject-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="subject-edit">
        <input type="hidden" name="id" value="<?= $subject->getId() ?>">
    </form>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('subject-index') ?>">Powrót do listy</a></li>
        <li>
            <form action="<?= $router->generatePath('subject-delete') ?>" method="post">
                <input type="submit" value="Usuń" onclick="return confirm('Czy na pewno chcesz usunąć?')">
                <input type="hidden" name="action" value="subject-delete">
                <input type="hidden" name="id" value="<?= $subject->getId() ?>">
            </form>
        </li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
