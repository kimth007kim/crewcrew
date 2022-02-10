package matchTeam.crewcrew.util.helper;

import matchTeam.crewcrew.response.exception.board.CannotConvertNestedStructureException;

import java.util.*;
import java.util.function.Function;

public class NestedConvertHelper<K, E, D> {

    private List<E> entities;
    private Function<E, D> toDto;
    private Function<E, E> getCategoryParent;
    private Function<E, K> getKey;
    private Function<D, List<D>> getChildren;

    public static <K, E, D> NestedConvertHelper newInstance(List<E> entities, Function<E, D> toDto, Function<E, E> getCategoryParent, Function<E, K> getKey, Function<D, List<D>> getChildren) {
        return new NestedConvertHelper<K, E, D>(entities, toDto, getCategoryParent, getKey, getChildren);
    }

    private NestedConvertHelper(List<E> entities, Function<E, D> toDto, Function<E, E> getCategoryParent, Function<E, K> getKey, Function<D, List<D>> getChildren) {
        this.entities = entities;
        this.toDto = toDto;
        this.getCategoryParent = getCategoryParent;
        this.getKey = getKey;
        this.getChildren = getChildren;
    }

    public List<D> convert() {
        try {
            return convertInternal();
        } catch (NullPointerException e) {
            throw new CannotConvertNestedStructureException(e.getMessage());
        }
    }

    private List<D> convertInternal() {
        Map<K, D> map = new HashMap<>();
        List<D> roots = new ArrayList<>();

        for (E e : entities) {
            D dto = toDto(e);
            map.put(getKey(e), dto);
            if (hasCategoryParent(e)) {
                E CategoryParent = getCategoryParent(e);
                K CategoryParentKey = getKey(CategoryParent);
                D CategoryParentDto = map.get(CategoryParentKey);
                getChildren(CategoryParentDto).add(dto);
            } else {
                roots.add(dto);
            }
        }
        return roots;
    }

    private boolean hasCategoryParent(E e) {
        return getCategoryParent(e) != null;
    }

    private E getCategoryParent(E e) {
        return getCategoryParent.apply(e);
    }

    private D toDto(E e) {
        return toDto.apply(e);
    }

    private K getKey(E e) {
        return getKey.apply(e);
    }

    private List<D> getChildren(D d) {
        return getChildren.apply(d);
    }
}