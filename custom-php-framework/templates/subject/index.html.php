<?php

/** @var \App\Model\Subject[] $subjects */
/** @var \App\Service\Router $router */

$title = 'Lista przedmiotów';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Lista przedmiotów</h1>

    <a href="<?= $router->generatePath('subject-create') ?>">Dodaj nowy</a>

    <ul class="index-list">
        <?php foreach ($subjects as $subject): ?>
            <li><h3><?= $subject->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('subject-show', ['id' => $subject->getId()]) ?>">Szczegóły</a></li>
                    <li><a href="<?= $router->generatePath('subject-edit', ['id' => $subject->getId()]) ?>">Edytuj</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
